function eval() {
    // Do not use eval!!!
    return;
}
function expressionCalculator(expr) {
    let arr = [];
    let outArray = [];
    let operStack = [];
    let counter = 0;

    if (expr.indexOf(' ')){
        arr = expr.split('');
    }
    else{
        arr = expr.split(' ');
    }

    for (let item of expr){
        if (item == '('){
            counter = counter + 1;
        }
        if (item == ')'){
            counter = counter - 1;
        }
    }
   if (counter != 0){
       throw new Error("ExpressionError: Brackets must be paired");
    }

    arr.forEach(function(element){
        if (element == '('){
            operStack.push(element);
        }

        if (element == '+' || element == '-'){
            if (operStack.length == 0 || operStack[operStack.length - 1] == '('){
                operStack.push(element);
            }
            else{
                if (operStack[operStack.length - 1] == '+' || operStack[operStack.length - 1] == '-' || operStack[operStack.length - 1] == '*' || operStack[operStack.length - 1] == '/'){
                    outArray.push(operStack[operStack.length - 1]);
                    operStack.pop(operStack[operStack.length - 1]);
                    if (operStack[operStack.length - 1] == '+' || operStack[operStack.length - 1] == '-' || operStack[operStack.length - 1] == '*' || operStack[operStack.length - 1] == '/'){
                        outArray.push(operStack[operStack.length - 1]);
                        operStack.pop(operStack[operStack.length - 1]);
                    }
                    operStack.push(element);
                }
                
            }
        }

        if (element == '*' || element == '/'){
            if (operStack.length == 0){
                operStack.push(element);
            }
            else{
                if (operStack[operStack.length - 1] == '+' || operStack[operStack.length - 1] == '-' || operStack[operStack.length - 1] == '('){
                    operStack.push(element);
                }
                else {
                    if (operStack[operStack.length - 1] == '*' || operStack[operStack.length - 1] == '/'){
                        outArray.push(operStack[operStack.length - 1]);
                        operStack.pop(operStack[operStack.length - 1]);
                        operStack.push(element);
                    }
                }
            }
        }

        if (element == ')'){
            for (let i = operStack.length - 1; i > 0 ; i--){
                if ( operStack[i] != '('){
                    outArray.push(operStack[i]);
                    operStack.pop(operStack[i]);
                }
                if ( operStack[i-1] == '(') {
                    operStack.pop(operStack[i]);
                    break;
                }
            } 
        }

        if (!isNaN(parseFloat(element)) && isFinite(element)){
            outArray.push(element);
        }
    });

    if (operStack.length != 0){
        for (let i = operStack.length - 1; i >= 0; i--){
            outArray.push(operStack[i]);
        }
    }
    let stack = [];
    let firstOp = [];
    let secondOp = [];
    outArray.forEach(function(item){
        if (item != '*' && item != '/' && item != '+' && item != '-'){
            stack.push(item);
        }
        else{
            firstOp = +stack.pop(item);
            secondOp = +stack.pop(item);
            switch (item) {
                case "+":
                    stack.push(firstOp + secondOp);
                  break;
                case "-":
                    stack.push(secondOp - firstOp);
                  break;
                case "*":
                        
                    stack.push(firstOp * secondOp);
                  break;
                case "/":
                        if (firstOp == 0){
                            throw new Error('TypeError: Division by zero.');
                        }
                    stack.push(secondOp / firstOp);
                  break;
              }
        }
        
    })
    return (stack[0]);  
}

module.exports = {
    expressionCalculator
}