import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

@Entity("product")
export class ProductEntity extends BaseEntity {
  @PrimaryColumn()
  asin: string;

  @PrimaryColumn()
  locale: string;

  @Column()
  sellerName: string;

  @Column()
  availability: boolean;

  @Column()
  price: number;

  @Column()
  name: string;

  @Column()
  link: string;
}
