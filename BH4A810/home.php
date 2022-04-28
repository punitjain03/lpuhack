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
        }
        else{
            $get_login_error=true;
            // echo " not found";
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
    <!-- link rel="preconnect" href="https://fonts.googleapis.com"> -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="login2.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Yellowtail&display=swap" rel="stylesheet">
    <title>REOW-Reading Owl</title>
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
    <script src="script.js" defer></script>
    
</head>
    <?php

    if($get_login_error==true){

        echo '<div class="login-error show" id="login-error">

            <!-- <div class="error-symbol"> -->
                <img src="errorcross.jpg" alt="" height="100px" width="100px">
            <!-- </div> -->
            <div class="error-text">
                Invalid credentials
            </div>
            <!-- <div class="error-back"> -->
                <button onclick="error_back()"><a href="/tgih/login.php">OK<a/></button>
            <!-- </div> -->

            </div>';
    }
           
    ?>







<body>
    <div class="home">

        <!-- nav -->
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
            <!-- <button><a href="/tgih/login.php">Login</a></button> -->
                    
        </div>

        <div class="cont-one">

                <div class="title">
                        <h1>Get Me A Mate..</h1>
                        <p>Connecting Peoples Quickly...</p>
                        <button><a href="/tgih/login.php">Login</a></button>
                </div>
                <div class="pic_one">
                    <img src="pic_one.png" alt="">
                </div>
    
                
        </div>
        <div class="bt_1">
            <?php
                // if(!isset($_SESSION['loggedin']) || $_SESSION['loggedin']!=true){
                //     echo " ";
                // }
                // else{
                //     echo '<a href="/tgih/search.php">search</a>';
                // }
            ?>
        </div>
            

        
        

    </div>

    <?php

// if(!isset($_SESSION['loggedin']) || $_SESSION['loggedin']!=true){
//     echo "login";

// }
// else{
//     echo '<a href="/tgih/logout.php">logout</a>';
// }

?>


          <!-- aos function    -->
          <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
        <script>
            AOS.init();
        </script>

</body>

</html>
<!-- 1.  -->