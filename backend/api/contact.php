<?php
/**
 * Contact Enquiries API Endpoint
 */

require_once __DIR__ . '/../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        try {
            $stmt = $pdo->query("SELECT * FROM contact_enquiries ORDER BY created_at DESC");
            $contacts = $stmt->fetchAll();
            echo json_encode([
                'status' => 'success',
                'data' => $contacts
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
        break;

    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);

        if (!$input) {
            $input = $_POST;
        }

        $full_name    = trim($input['full_name'] ?? $input['fullName'] ?? '');
        $phone_number = trim($input['phone_number'] ?? $input['phoneNumber'] ?? '');
        $message      = trim($input['message'] ?? '');

        if (empty($full_name) || empty($phone_number)) {
            http_response_code(400);
            echo json_encode([
                'status' => 'error',
                'message' => 'Full name and phone number are required.'
            ]);
            exit();
        }

        try {
            $sql = "INSERT INTO contact_enquiries (full_name, phone_number, message, status) 
                    VALUES (:full_name, :phone_number, :message, 'Unread')";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':full_name'    => $full_name,
                ':phone_number' => $phone_number,
                ':message'      => $message
            ]);

            http_response_code(201);
            echo json_encode([
                'status' => 'success',
                'message' => 'Contact message saved successfully.',
                'id' => $pdo->lastInsertId()
            ]);
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
