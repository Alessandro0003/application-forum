import { Entity } from '../../core/entities/entity'


interface AnswerProps {
    content: string 
    authorId: string 
    questionId: string 
}

export class Answer extends Entity{
    public content: string
    public authorId: string
    public questionId: string

    constructor (props: AnswerProps, id?: string) {
        super(id)
        this.content = props.content
        this.authorId = props.authorId
        this.questionId = props.questionId
    }
}