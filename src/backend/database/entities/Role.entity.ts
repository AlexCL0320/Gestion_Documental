// import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
// import { Permission } from "./Permission.entity";

// @Entity("roles")
// export class Role {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column({ length: 100, unique: true })
//     name: string;

//     @Column({ length: 255, nullable: true })
//     description: string;

//     @ManyToMany(() => Permission)
//     @JoinTable({
//         name: "role_has_permissions",
//         joinColumn: { name: "role_id" },
//         inverseJoinColumn: { name: "permission_id" }
//     })
//     permissions: Permission[];

//     @CreateDateColumn()
//     created_at: Date;

//     @UpdateDateColumn()
//     updated_at: Date;
// }