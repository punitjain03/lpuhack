<?php
session_start();
if(!isset($_SESSION['loggedin']) || $_SESSION['loggedin']!=true){
    header('Location: home.php');
}
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
// $in_1=$_SESSION["in_1"];
// $in_2=$_SESSION["in_2"];
// $in_3=$_SESSION["in_3"];
// echo $reg_id;
// echo"helo";
?>

<?php
if($_POST){

    if($_POST["action"]=="search"){
        $s_1=$_POST["s_1"];
        $s_2=$_POST["s_2"];

        // $user_password=$_POST["user_password"];

        // echo $studenttel;
        // echo $stpassword;
        $sql="SELECT * FROM `st_register` WHERE in_1='$s_1' OR in_2='$s_1' OR in_1='$s_2' OR in_2='$s_2' ";
        $result=mysqli_query($conn,$sql);
        $num=mysqli_num_rows($result);
        if($num>=1){
            // echo "found";
            echo $num;
            // $row=mysqli_fetch_assoc($result);
            // echo var_dump($row);
            $count=0;
            while($row=mysqli_fetch_assoc($result)){
                $arr[$count]=$row['reg_no'];
                $count=$count+1;
            }
            // foreach($arr as $n){
            //     echo "value is $n <br />";
            // }
            // echo $count;
            
            $ind=rand(0,$count-1);
            // echo $ind;
            $search_reg=$arr[$ind];
            echo $search_reg;


            $sql1="SELECT * FROM `st_register` WHERE reg_no='$search_reg' ";
            $result1=mysqli_query($conn,$sql1);
            $num=mysqli_num_rows($result1);
            if($num==1){
                $row1=mysqli_fetch_assoc($result1);
                // echo $row1['full_name'];
                $_SESSION['full_name']=$row1['full_name'];
                $_SESSION['search_reg']=$row1['reg_no'];
                $_SESSION['email']=$row1['email'];
                
                // $_SESSION['email']=$row1['email'];
                header("location: /tgih/result.php");    
            }
            else{
                echo"no";
            }



            
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
    <link rel="stylesheet" href="search.css">
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
<body class="align">

  <h3>FIND A MATE </h3>

  <form action="/tgih/search.php" method="post">

    <div class="form__field">
    <input type="hidden" name="action" value="search" id="">
      <input type="text" placeholder="prefrence 1" class="form__input"  name="s_1" required>
      <input type="text" placeholder="prefrence 2" class="form__input"  name="s_2" required>
      <button>SUBMIT</button>

      <span class="icon"></span>
    </div>

  </form>



</body>
    
</body>
</html>






