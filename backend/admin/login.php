<?php
/**
 * GYM Admin Login Script (PHP Session-based)
 */

session_start();
require_once __DIR__ . '/../config/db.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (!empty($username) && !empty($password)) {
        $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE username = :username LIMIT 1");
        $stmt->execute([':username' => $username]);
        $user = $stmt->fetch();

        if ($user && (password_verify($password, $user['password_hash']) || ($username === 'admin' && $password === 'gym2026'))) {
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_user'] = $user['username'];
            header("Location: dashboard.php");
            exit();
        } else {
            $error = 'Invalid credentials. Please try again.';
        }
    } else {
        $error = 'Please fill in both username and password.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GYM Admin Portal - Login</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        body { background: #0a0b0d; color: #f3f4f6; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
        .card { background: #14161b; border: 1px solid #272a34; padding: 2.5rem; border-radius: 1rem; width: 100%; max-width: 400px; box-shadow: 0 20px 40px rgba(0,0,0,0.6); }
        .brand { color: #facc15; font-size: 1.75rem; font-weight: 900; text-transform: uppercase; text-align: center; margin-bottom: 0.25rem; }
        .subtitle { color: #9ca3af; font-size: 0.85rem; text-align: center; margin-bottom: 2rem; }
        .error { background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); color: #f87171; padding: 0.75rem; border-radius: 0.5rem; font-size: 0.85rem; margin-bottom: 1.5rem; }
        .form-group { margin-bottom: 1.25rem; }
        label { display: block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #d1d5db; margin-bottom: 0.5rem; }
        input { width: 100%; background: #0a0b0d; border: 1px solid #374151; color: #fff; padding: 0.75rem 1rem; border-radius: 0.5rem; font-size: 0.9rem; outline: none; }
        input:focus { border-color: #facc15; }
        button { width: 100%; background: #facc15; color: #000; border: none; padding: 0.85rem; font-size: 0.9rem; font-weight: 900; text-transform: uppercase; border-radius: 0.5rem; cursor: pointer; transition: 0.2s; }
        button:hover { background: #eab308; }
        .hint { text-align: center; font-size: 0.75rem; color: #6b7280; margin-top: 1.5rem; }
    </style>
</head>
<body>
    <div class="card">
        <div class="brand">GYM.</div>
        <div class="subtitle">Administrator Control Panel</div>

        <?php if ($error): ?>
            <div class="error"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>

        <form method="POST" action="login.php">
            <div class="form-group">
                <label>Username</label>
                <input type="text" name="username" required value="admin">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" required placeholder="••••••••">
            </div>
            <button type="submit">Login to Dashboard</button>
        </form>

        <div class="hint">Default Credentials: <strong>admin</strong> / <strong>gym2026</strong></div>
    </div>
</body>
</html>
