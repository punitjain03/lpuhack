<?php
session_start();

// session_abort();
session_unset();
session_destroy();
header("location: /tgih/home.php");
exit();
?>