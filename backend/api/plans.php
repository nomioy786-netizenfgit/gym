<?php
/**
 * Membership Plans API Endpoint
 */

require_once __DIR__ . '/../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        try {
            $stmt = $pdo->query("SELECT * FROM membership_plans ORDER BY price ASC");
            $plans = $stmt->fetchAll();
            echo json_encode([
                'status' => 'success',
                'data' => $plans
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
        break;

    case 'POST':
        // Protected Admin route
        $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
        $name = trim($input['name'] ?? '');
        $price = intval($input['price'] ?? 0);
        $period = trim($input['period'] ?? 'Month');
        $is_popular = !empty($input['is_popular']) ? 1 : 0;
        $features = trim($input['features'] ?? '');
        $description = trim($input['description'] ?? '');

        if (empty($name) || $price <= 0) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Valid plan name and price required.']);
            exit();
        }

        try {
            $sql = "INSERT INTO membership_plans (name, price, period, is_popular, features, description) 
                    VALUES (:name, :price, :period, :is_popular, :features, :description)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':name' => $name,
                ':price' => $price,
                ':period' => $period,
                ':is_popular' => $is_popular,
                ':features' => $features,
                ':description' => $description
            ]);

            http_response_code(201);
            echo json_encode(['status' => 'success', 'id' => $pdo->lastInsertId()]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
        break;
}
