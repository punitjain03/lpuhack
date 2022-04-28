<?php
session_start();
// if(!isset($_SESSION['loggedin']) || $_SESSION['loggedin']!=true){
//     header('Location: /tgih/home.php');
// }
$servername="localhost";
$usename="root";
$password="";
$database="hackathon";

$conn=mysqli_connect($servername,$usename,$password,$database);
// if($conn){
//     echo "yes";
// }

?>
<?php
$search_reg_no=$_SESSION["search_reg"];
$full_name=$_SESSION["full_name"];
$email=$_SESSION["email"];
// $in_2=$_SESSION["in_2"];
// $in_3=$_SESSION["in_3"];
// echo $reg_id;
// echo $search_reg;
// echo $full_name;
// echo $email;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Handlee&family=Merienda:wght@400;700&family=Yellowtail&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="result1.css">
    <title>Document</title>
</head>

<body>
<div class="nav">
            <img src="Q.png" alt="" >
                    <?php
                            // if(!isset($_SESSION['loggedin']) || $_SESSION['loggedin']!=true){
                            //     echo '<button class="loginbtn" onclick="getlogin()"><a href="/tgih/register.php">register</a></button>';
                            // }
                            // else{
                            //     echo '<button class="loginbtn" onclick="getlogin()">'.$_SESSION["user_name"].'</button>';
                            // }
                    ?>
            <button><a href="/tgih/logout.php">Logout</a></button>
                    
        </div>




    <p><span class="hello">Hello,</span> I am <span class="name" ><?php echo $full_name ?></span> 2nd year student of btech department. You can freely contact me, this is my registration number- <span class="reg-no"><?php echo $search_reg_no ?></span>. </p>
</body>
</html>
