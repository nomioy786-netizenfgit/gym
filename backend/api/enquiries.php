<?php
/**
 * Membership Enquiries API Endpoint
 * Handles fetching, registering, and updating membership requests
 */

require_once __DIR__ . '/../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        try {
            $stmt = $pdo->query("SELECT * FROM membership_enquiries ORDER BY created_at DESC");
            $enquiries = $stmt->fetchAll();
            echo json_encode([
                'status' => 'success',
                'data' => $enquiries
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
        $plan_name    = trim($input['plan_name'] ?? $input['planName'] ?? 'STANDARD PLAN');
        $plan_price   = intval($input['plan_price'] ?? $input['planPrice'] ?? 1499);
        $age          = intval($input['age'] ?? 24);
        $joining_date = trim($input['joining_date'] ?? $input['joiningDate'] ?? date('Y-m-d'));
        $notes        = trim($input['notes'] ?? '');

        // Validation
        if (empty($full_name) || empty($phone_number)) {
            http_response_code(400);
            echo json_encode([
                'status' => 'error',
                'message' => 'Full name and phone number are required.'
            ]);
            exit();
        }

        // Generate unique enquiry number (GYM-PK-XXXX)
        $random_digits = rand(1000, 9999);
        $enquiry_number = 'GYM-PK-' . $random_digits;

        try {
            $sql = "INSERT INTO membership_enquiries 
                    (enquiry_number, full_name, phone_number, plan_name, plan_price, age, joining_date, notes, status) 
                    VALUES (:enquiry_number, :full_name, :phone_number, :plan_name, :plan_price, :age, :joining_date, :notes, 'New')";
            
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':enquiry_number' => $enquiry_number,
                ':full_name'      => $full_name,
                ':phone_number'   => $phone_number,
                ':plan_name'      => $plan_name,
                ':plan_price'     => $plan_price,
                ':age'            => $age,
                ':joining_date'   => $joining_date,
                ':notes'          => $notes
            ]);

            $id = $pdo->lastInsertId();

            http_response_code(201);
            echo json_encode([
                'status' => 'success',
                'message' => 'Membership enquiry registered successfully.',
                'data' => [
                    'id'             => $id,
                    'enquiry_number' => $enquiry_number,
                    'full_name'      => $full_name,
                    'phone_number'   => $phone_number,
                    'plan_name'      => $plan_name,
                    'plan_price'     => $plan_price,
                    'age'            => $age,
                    'joining_date'   => $joining_date,
                    'status'         => 'New'
                ]
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
