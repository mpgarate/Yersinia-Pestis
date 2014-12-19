final int Y_KEYCODE = 89;
final int N_KEYCODE = 78;

int currentQuestion = 0;

ArrayList questions = new ArrayList();

void addQuestion(question){
    questions.add(question);
    println(question);
}

void setup(){
    size(200, 200);
    background(100);
    stroke(255);
}

void keyPressed(){
    println(questions[0].optionA.description);

    if (Y_KEYCODE == keyCode){
        boolean response = true;
    } else if (N_KEYCODE == keyCode){
        boolean response = false;
    } else {
        return;
    }

    Question question = questions[currentQuestion];
    question.response = response;
}

void draw(){
}

void update(){
}

