<?php
/**
 * Proxy KoboToolbox — Pour déploiement sur serveur PHP
 * Permet d'éviter d'exposer le token API côté navigateur.
 *
 * Usage depuis JavaScript :
 *   fetch('proxy.php?endpoint=data&limit=5000')
 *   fetch('proxy.php?endpoint=schema')
 */

require_once 'config.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-store');

$endpoint = $_GET['endpoint'] ?? 'data';
$limit    = min((int)($_GET['limit'] ?? 5000), 30000);
$offset   = max((int)($_GET['offset'] ?? 0), 0);

$urls = [
    'schema' => KOBO_BASE . '/assets/' . KOBO_UID . '/?format=json',
    'data'   => KOBO_BASE . '/assets/' . KOBO_UID . '/data/?format=json&limit=' . $limit . '&start=' . $offset,
];

if (!array_key_exists($endpoint, $urls)) {
    http_response_code(400);
    echo json_encode(['error' => 'Endpoint invalide. Valeurs acceptées : schema, data']);
    exit;
}

$context = stream_context_create([
    'http' => [
        'method'  => 'GET',
        'header'  => implode("\r\n", [
            'Authorization: Token ' . KOBO_TOKEN,
            'Accept: application/json',
        ]),
        'timeout' => 60,
        'ignore_errors' => true,
    ],
    'ssl' => [
        'verify_peer'      => true,
        'verify_peer_name' => true,
    ]
]);

$response = @file_get_contents($urls[$endpoint], false, $context);

if ($response === false) {
    http_response_code(502);
    echo json_encode(['error' => 'Impossible de joindre l\'API KoboToolbox.']);
    exit;
}

// Transmet le code HTTP de la réponse KoboToolbox
$status_line = $http_response_header[0] ?? '';
if (preg_match('/HTTP\/\d\.\d\s+(\d+)/', $status_line, $m)) {
    http_response_code((int)$m[1]);
}

echo $response;
