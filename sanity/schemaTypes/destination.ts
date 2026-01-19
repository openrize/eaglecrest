import { defineField, defineType } from 'sanity'

export const destination = defineType({
    name: 'destination',
    title: 'Destination',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'image',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'region',
            title: 'Region',
            type: 'string',
            options: {
                list: ['Europe', 'Asia', 'Africa', 'North America', 'South America', 'Oceania'],
            },
        }),
        defineField({
            name: 'rating',
            title: 'Rating',
            type: 'number',
            initialValue: 5.0,
        }),
        defineField({
            name: 'priceStart',
            title: 'Starting Price',
            type: 'number',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'highlights',
            title: 'Highlights',
            type: 'array',
            of: [{ type: 'string' }],
        }),
    ],
})
