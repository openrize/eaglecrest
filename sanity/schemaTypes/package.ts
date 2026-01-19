import { defineField, defineType } from 'sanity'

export const packageType = defineType({
    name: 'package',
    title: 'Package',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'id',
            title: 'Package ID',
            type: 'string',
            description: 'Unique identifier used in URL (e.g. pkg_1)',
        }),
        defineField({
            name: 'destination',
            title: 'Destination',
            type: 'reference',
            to: { type: 'destination' },
        }),
        defineField({
            name: 'price',
            title: 'Price per Person',
            type: 'number',
        }),
        defineField({
            name: 'duration',
            title: 'Duration',
            type: 'string',
            description: 'e.g., 7 Days / 6 Nights',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
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
        defineField({
            name: 'itinerary',
            title: 'Itinerary',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'day', type: 'number', title: 'Day' },
                        { name: 'title', type: 'string', title: 'Title' },
                        { name: 'description', type: 'text', title: 'Description' },
                    ],
                },
            ],
        }),
    ],
})
