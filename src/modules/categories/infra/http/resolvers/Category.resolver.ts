import ListCategoryService from '@modules/categories/services/ListCategoryService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import UpdateCategoryService from '@modules/categories/services/UpdateCategoryService';
import DeleteCategoryService from '@modules/categories/services/DeleteCategoryService';
import { UserRole } from '@modules/users/infra/typeorm/entities/User';
import { IAuthCheckerData } from '@shared/infra/http/schemas';
import Category from '../../typeorm/entities/Category';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../schemas/Category.schema';

@Resolver(Category)
class CategoriesResolver {
  @Query(() => Category, { nullable: true })
  async category(@Arg('id') id: string): Promise<Category | undefined> {
    const listCategoryService = container.resolve(ListCategoryService);

    const category = await listCategoryService.execute({ id });
    return classToClass(category);
  }

  @Authorized<IAuthCheckerData>({
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  })
  @Mutation(() => Category)
  async createCategory(
    @Arg('input') input: CreateCategoryInput,
  ): Promise<Category> {
    const { name } = input;

    const createCategoryService = container.resolve(CreateCategoryService);

    const category = await createCategoryService.execute({
      name,
    });

    return classToClass(category);
  }

  @Authorized<IAuthCheckerData>({
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  })
  @Mutation(() => Category)
  async updateCategory(
    @Arg('input') input: UpdateCategoryInput,
  ): Promise<Category> {
    const { id, name } = input;

    const updateCategoryService = container.resolve(UpdateCategoryService);

    const category = await updateCategoryService.execute({
      categoryId: id,
      name,
    });

    return classToClass(category);
  }

  @Authorized<IAuthCheckerData>({
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  })
  @Mutation(() => Category)
  async deleteCategory(@Arg('id') id: string): Promise<Category> {
    const deleteCategoryService = container.resolve(DeleteCategoryService);

    const category = await deleteCategoryService.execute({ categoryId: id });

    return classToClass(category);
  }
}

export default CategoriesResolver;
