
    <div class="login">
        <div class="col-sm-12 col-md-4 bg-white border rounded p-4 shadow-sm">
            <form method="post" action="assets/php/actions.php?login">
                <div class="d-flex justify-content-center">

                    <img class="mb-4" src="assets/images/CollabIt.png" alt="" height="135">
                </div>

                <h1 class="h5 mb-3 fw-normal">&emsp; &emsp; &emsp; &emsp; &emsp; &emsp;  &emsp; <b> SIGN IN</b> </h1>

                <div class="form-floating">
                    <input type="text" name="username_email" value="<?=showFormData('username_email')?>" class="form-control rounded-0" placeholder="username">
                    <label for="floatingInput">Username</label>
                </div>
                <?=showError('username_email')?>
                <div class="form-floating mt-1">
                    <input type="password" name="password" class="form-control rounded-0" id="floatingPassword" placeholder="Password">
                    <label for="floatingPassword">Password</label>
                </div>
                <?=showError('password')?>
                <?=showError('checkuser')?>


                <div class="mt-3 d-flex justify-content-between align-center">
                    <button class="btn btn-primary" type="submit">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; LOGIN&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</button>
                </div>
                </br>
                    <a href="?signup" class="text-decoration-none">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Create New Account</a>
                
                <a href="?forgotpassword&newfp" class="text-decoration-none">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Forgot password ?</a>
            </form>
        </div>
    </div>

