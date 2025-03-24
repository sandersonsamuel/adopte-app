import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AnimalsModule } from 'src/modules/animals/animals.module';
import { CategoriesModule } from 'src/modules/categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: '../../.env'
    }),
    CategoriesModule,
    AnimalsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
