<?php
session_start();
// if(!isset($_SESSION['loggedin']) || $_SESSION['loggedin']!=true){
//     header('Location: newreow.php');
// }
$servername="localhost";
$usename="root";
$password="";
$database="hackathon";

$conn=mysqli_connect($servername,$usename,$password,$database);
// if($conn){
//     echo "yes";
// }
$login_access=false;
$get_login_error=false;
$get_register_submitted=false;

if($_POST){

    if($_POST["action"]=="login"){
        $reg_no=$_POST["reg_no"];
        $user_password=$_POST["user_password"];

        // echo $studenttel;
        // echo $stpassword;
        $sql="SELECT * FROM `st_register` WHERE reg_no='$reg_no' AND user_password='$user_password'";
        $result=mysqli_query($conn,$sql);
        $num=mysqli_num_rows($result);
        
        if($num==1){
            // echo "found";
            $row=mysqli_fetch_assoc($result);
            // echo $row;
            // echo var_dump($row);
            $login_access=true;
            // session_reset();
            $_SESSION["loggedin"]=true;
            $_SESSION["user_name"]=$row['full_name'];
            $_SESSION["in_1"]=$row['in_1'];
            $_SESSION["in_2"]=$row['in_2'];
            $_SESSION["in_3"]=$row['in_3'];
            echo $_SESSION["user_name"];
            header("location: /tgih/search.php");
        }
        else{
            $get_login_error=true;
            echo '<script language="javascript">';
            echo 'alert("Wrong")';
            echo '</script>';
            // echo " not found";
        }


    }
    else if($_POST["action"]=="register"){

        session_reset();
        $full_name=$_POST["full_name"];
        $reg_no=$_POST["reg_no"];
        $_SESSION["reg_id"]=$_POST["reg_no"];
        $ph_no=$_POST["ph_no"];
        $user_password=$_POST["user_password"];
        $user_email=$_POST["user_email"];

        // echo $studenttel;
        // echo $studentclass;
        // echo $stpassword;
        // echo $full_name;

        $sql="INSERT INTO `st_register` (`full_name`, `reg_no`, `ph_no`, `user_password`, `user_email`) VALUES ('$full_name', '$ph_no', '$reg_no','$user_password', '$user_email');";
        $result=mysqli_query($conn,$sql);
        if($result){
            // echo "submitted";
            $get_register_submitted=true;
            header("location: /tgih/interest.php");
        }
        else{
            die ("not submit");
        }
        
    }
}
?>
<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title> Login </title>
  <link rel="stylesheet" href="new_login2.css">
  <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Rubik:400,700'><link rel="stylesheet" href="./style.css">

</head>
<body>
<!-- partial:index.partial.html -->
<div class="login-form">
  <form action="/tgih/login.php" method="post">
  <input type="hidden" name="action" value="login" id="">
    <h1>Login</h1>
    <div class="content">
      <div class="input-field">
        <input type="number" placeholder="REG No" autocomplete="nope" name="reg_no">
      </div>
      <div class="input-field">
        <input type="password" placeholder="Password" autocomplete="new-password" name="user_password">
      </div>
      
    </div>
    <div class="action">
      <button><a href="/tgih/register.php">REGISTER</a></button>
      <button>Sign in</button>
    </div>
  </form>
</div>
<!-- partial -->
  <script  src="./script.js"></script>

</body>
</html>
