// import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
// import { Role } from "./Role.entity";

// @Entity("users")
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column({ length: 100 })
//     name: string;

//     @Column({ unique: true, length: 255 })
//     email: string;

//     @Column({ select: false }) // Para no seleccionar el password por defecto
//     password: string;

//     @Column({ default: true })
//     active: boolean;

//     @ManyToMany(() => Role, role => role.users)
//     @JoinTable({
//         name: "model_has_roles",
//         joinColumn: { name: "model_id", referencedColumnName: "id" },
//         inverseJoinColumn: { name: "role_id" }
//     })
//     roles: Role[];

//     @CreateDateColumn()
//     created_at: Date;

//     @UpdateDateColumn()
//     updated_at: Date;
// }