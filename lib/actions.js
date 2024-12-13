'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { saveMeal } from './meals';

function isInvalidText(text) {
  return typeof text !== 'string' || text.trim() === '';
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidFile(file) {
  return file && typeof file.size === 'number' && file.size > 0;
}

export async function shareMeals(prevState, formData) {
  const meal = {
    title: formData.get('title'),
    image: formData.get('image'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  // Validate fields
  const errors = [];
  if (isInvalidText(meal.title)) errors.push('Title is required.');
  if (isInvalidText(meal.summary)) errors.push('Summary is required.');
  if (isInvalidText(meal.instructions))
    errors.push('Instructions are required.');
  if (isInvalidText(meal.creator)) errors.push('Creator name is required.');
  if (!isValidEmail(meal.creator_email)) errors.push('Invalid email address.');
  if (!isValidFile(meal.image)) errors.push('A valid image file is required.');

  if (errors.length > 0) {
    return {
      message: errors,
    };
  }

  // Save the meal and redirect
  await saveMeal(meal);
  revalidatePath('/meals');
  redirect('/meals');
}
