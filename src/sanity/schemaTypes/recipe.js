export default {
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Recipe Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    },
    {
      name: 'image',
      title: 'Recipe Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'calories',
      title: 'Calories (kcal)',
      type: 'number',
    },
    {
      name: 'tags',
      title: 'Tags (e.g., keto, vegan)',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'instructions',
      title: 'Instructions / Method',
      type: 'text',
    },
  ],
};