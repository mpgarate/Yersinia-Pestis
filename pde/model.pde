class Option {
    String description;
    double deathRateEffect;
    String resultDescription;

    public Option(descr, deathR, resultDescr){
        description = descr;
        deathRateEffect = deathR;
        resultDescription = resultDescr;
    }
}

class Question {
    Option optionA;
    Option optionB;

    public Question(opA, opB){
        optionA = opA;
        optionB = opB;
    }
}
