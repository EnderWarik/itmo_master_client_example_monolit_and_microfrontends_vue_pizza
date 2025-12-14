import users from './users.json'
import pizza from './pizza.json'
import misc from './misc.json'
import { genSalt, hash } from 'bcryptjs'
import { Application } from '../application'
import _ from 'lodash'
import {
  DoughRepository,
  IngredientRepository,
  MiscRepository,
  SauceRepository,
  SizeRepository,
  UserRepository,
} from '../repositories'

const populateUsers = async (
  user: { name: string, email: string, password: string, avatar: string, phone: string },
  userRepository: UserRepository
) => {
  const password = await hash(user.password, await genSalt());
  const newUser = await userRepository.create(_.omit(user, 'password'));
  return userRepository.customUserCredentials(newUser.id).create({password});
}

const populateDough = (
    dough: { name: string, image: string, description: string },
    doughRepository: DoughRepository
) => {
  return doughRepository.create(dough);
};

const populateIngredients = (
    ingredient: { name: string, image: string },
    ingredientRepository: IngredientRepository
) => {
  return ingredientRepository.create(ingredient);
};

const populateSauces = (
    sauce: { name: string },
    sauceRepository: SauceRepository
) => {
  return sauceRepository.create(sauce);
};

const populateSizes = (
    size: { name: string, image: string, multiplier: number },
    sizeRepository: SizeRepository
) => {
  return sizeRepository.create(size);
};

const populateMisc = (
    misc: { name: string, image: string, price: number },
    miscRepository: MiscRepository
) => {
  return miscRepository.create(misc);
};

export default async function load(app: Application) {
  const doughRepository = await app.getRepository(DoughRepository);
  const ingredientRepository = await app.getRepository(IngredientRepository);
  const sauceRepository = await app.getRepository(SauceRepository);
  const sizeRepository = await app.getRepository(SizeRepository);
  const miscRepository = await app.getRepository(MiscRepository);
  const userRepository = await app.getRepository(UserRepository);

  const [
    doughCount,
    ingCount,
    sauceCount,
    sizeCount,
    miscCount,
    userCount,
  ] = await Promise.all([
    doughRepository.count(),
    ingredientRepository.count(),
    sauceRepository.count(),
    sizeRepository.count(),
    miscRepository.count(),
    userRepository.count(),
  ]);

  const totalExisting =
    doughCount.count +
    ingCount.count +
    sauceCount.count +
    sizeCount.count +
    miscCount.count +
    userCount.count;

  if (totalExisting > 0) {
    console.log('Seed skipped: data already present');
    return;
  }

  const usersPromises = users.map(async user => populateUsers(user, userRepository))
  await Promise.all(usersPromises);

  const doughPromises = pizza.dough.map(async dough => populateDough(dough, doughRepository))
  await Promise.all(doughPromises);

  const ingredientsPromises = pizza.ingredients.map(async ing => populateIngredients(ing, ingredientRepository))
  await Promise.all(ingredientsPromises);

  const saucesPromises = pizza.sauces.map(async sauce => populateSauces(sauce, sauceRepository))
  await Promise.all(saucesPromises);

  const sizesPromises = pizza.sizes.map(async size => populateSizes(size, sizeRepository))
  await Promise.all(sizesPromises);

  const miscPromises = misc.map(async m => populateMisc(m, miscRepository))
  await Promise.all(miscPromises);

  console.log('Dummy data is populated')
}
