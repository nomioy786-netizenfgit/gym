<?php
/**
 * GYM Admin Dashboard (PHP)
 */

session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: login.php");
    exit();
}

require_once __DIR__ . '/../config/db.php';

// Handle Actions (status update, delete)
if (isset($_GET['action'])) {
    if ($_GET['action'] === 'update_status' && isset($_GET['id']) && isset($_GET['status'])) {
        $stmt = $pdo->prepare("UPDATE membership_enquiries SET status = :status WHERE id = :id");
        $stmt->execute([':status' => $_GET['status'], ':id' => $_GET['id']]);
        header("Location: dashboard.php");
        exit();
    }
    if ($_GET['action'] === 'delete_enquiry' && isset($_GET['id'])) {
        $stmt = $pdo->prepare("DELETE FROM membership_enquiries WHERE id = :id");
        $stmt->execute([':id' => $_GET['id']]);
        header("Location: dashboard.php");
        exit();
    }
}

// Fetch stats & data
$enquiries = $pdo->query("SELECT * FROM membership_enquiries ORDER BY created_at DESC")->fetchAll();
$contacts = $pdo->query("SELECT * FROM contact_enquiries ORDER BY created_at DESC")->fetchAll();
$plans = $pdo->query("SELECT * FROM membership_plans ORDER BY price ASC")->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GYM Admin Dashboard</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        body { background: #0a0b0d; color: #f3f4f6; }
        header { background: #14161b; border-bottom: 1px solid #272a34; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.5rem; font-weight: 900; color: #facc15; }
        .container { max-width: 1200px; margin: 2rem auto; padding: 0 1.5rem; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem; }
        .card { background: #14161b; border: 1px solid #272a34; border-radius: 0.75rem; padding: 1.5rem; }
        .card-num { font-size: 2.5rem; font-weight: 900; color: #fff; margin-top: 0.25rem; }
        .card-label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #9ca3af; }
        table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        th, td { padding: 0.85rem 1rem; text-align: left; font-size: 0.85rem; border-bottom: 1px solid #272a34; }
        th { background: #0e1014; text-transform: uppercase; font-size: 0.75rem; color: #9ca3af; }
        .badge { padding: 0.25rem 0.6rem; border-radius: 9999px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; }
        .badge-new { background: rgba(250, 204, 21, 0.2); color: #facc15; }
        .badge-enrolled { background: rgba(16, 185, 129, 0.2); color: #34d399; }
        .btn { padding: 0.4rem 0.8rem; font-size: 0.75rem; font-weight: 700; text-decoration: none; border-radius: 0.35rem; display: inline-block; }
        .btn-wa { background: #059669; color: #fff; }
        .btn-del { background: #7f1d1d; color: #fca5a5; }
        .logout { color: #ef4444; font-size: 0.85rem; font-weight: 700; text-decoration: none; border: 1px solid #7f1d1d; padding: 0.5rem 1rem; border-radius: 0.4rem; }
    </style>
</head>
<body>
    <header>
        <div class="logo">GYM. ADMIN</div>
        <div>
            <span style="color: #9ca3af; margin-right: 1.5rem; font-size: 0.85rem;">Logged in as: <strong><?= htmlspecialchars($_SESSION['admin_user']) ?></strong></span>
            <a href="login.php" class="logout">Logout</a>
        </div>
    </header>

    <div class="container">
        <div class="grid">
            <div class="card">
                <div class="card-label">Total Enquiries</div>
                <div class="card-num"><?= count($enquiries) ?></div>
            </div>
            <div class="card">
                <div class="card-label">Contact Messages</div>
                <div class="card-num"><?= count($contacts) ?></div>
            </div>
            <div class="card">
                <div class="card-label">Active Plans</div>
                <div class="card-num" style="color: #facc15;"><?= count($plans) ?></div>
            </div>
        </div>

        <div class="card">
            <h2 style="font-size: 1.25rem; font-weight: 900; text-transform: uppercase;">Membership Registrations</h2>
            <table>
                <thead>
                    <tr>
                        <th>Enquiry ID</th>
                        <th>Full Name</th>
                        <th>Phone</th>
                        <th>Plan</th>
                        <th>Age</th>
                        <th>Joining Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($enquiries as $enq): ?>
                    <tr>
                        <td style="color: #facc15; font-weight: 700;"><?= htmlspecialchars($enq['enquiry_number']) ?></td>
                        <td><strong><?= htmlspecialchars($enq['full_name']) ?></strong></td>
                        <td><?= htmlspecialchars($enq['phone_number']) ?></td>
                        <td><?= htmlspecialchars($enq['plan_name']) ?> (Rs. <?= htmlspecialchars($enq['plan_price']) ?>)</td>
                        <td><?= htmlspecialchars($enq['age']) ?></td>
                        <td><?= htmlspecialchars($enq['joining_date']) ?></td>
                        <td><span class="badge badge-<?= strtolower($enq['status']) ?>"><?= htmlspecialchars($enq['status']) ?></span></td>
                        <td>
                            <a href="https://wa.me/<?= preg_replace('/\D/', '', $enq['phone_number']) ?>?text=Hello%20<?= urlencode($enq['full_name']) ?>%20from%20GYM!" target="_blank" class="btn btn-wa">WhatsApp</a>
                            <a href="dashboard.php?action=delete_enquiry&id=<?= $enq['id'] ?>" onclick="return confirm('Delete enquiry?')" class="btn btn-del">Delete</a>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>
