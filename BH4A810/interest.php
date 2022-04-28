<?php
session_start();
// if(!isset($_SESSION['loggedin']) || $_SESSION['loggedin']!=true){
//     header('Location: home.php');
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
$reg_id=$_SESSION["reg_id"];
echo $reg_id;
// echo"helo";
?>

<?php

if($_POST){

    if($_POST["action"]=="add_interest"){
        $in_1=$_POST["in_1"];
        $in_2=$_POST["in_2"];
        // $in_3=$_POST["in_3"];
        // $user_password=$_POST["user_password"];
        // $user_email=$_POST["user_email"];

        // echo $in_1;
        // echo $in_2;  
        // echo $in_3;
        

        $sql="UPDATE `st_register` SET in_1='".$in_1."' , in_2='".$in_2."' WHERE reg_no='".$reg_id."';";
        $result=mysqli_query($conn,$sql);
        if($result){
            // echo "submitted";
            $get_register_submitted=true;
            echo"yes";
            header("location: /tgih/login.php");
        }
        else{
            
            die ("not submit");
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="interest1.css">
    <title>Document</title>
</head>
<body>
    

<body class="align">

  <h3>YOUR INTERESTS</h3>

  <form action="/tgih/interest.php" method="post">
  <input type="hidden" name="action" value="add_interest" id="">

    <div class="form__field">
      <input type="text" placeholder="INTEREST 1" class="form__input"  name="in_1" required>
      <input type="text" placeholder="INTEREST 2" class="form__input"  name="in_2" required>
      <!-- <input type="text" placeholder="INTEREST 3" class="form__input"  name="in_3" required> -->
      <button>SUBMIT</button>

      <span class="icon"></span>
    </div>

  </form>

  

</body>
</body>
</html>
