function getBotResponse(input) {
    //rock paper scissors
    if (input == "tell me more about courses") {
        return "Which course do you want to do ?";
    } else if (input == "Java") {
        return "https://www.geeksforgeeks.org/java/";
    } else if (input == "C++") {
        return "https://www.geeksforgeeks.org/c-plus-plus/";
    }
    else if (input == "Python"){
        return "https://www.geeksforgeeks.org/python-programming-language/";
    }

    // Simple responses
    if (input == "hello") {
        return "Hello there!";
    } else if (input == "talk to you later") {
        return "Have a nice day!";
    } else {
        return "Try asking something else!";
    }

    

}