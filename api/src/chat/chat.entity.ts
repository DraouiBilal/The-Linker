import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class Chat{
   
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    from: string

    @Column()
    to: string

    @Column()
    message: string

    @Column()
    date: Date
}