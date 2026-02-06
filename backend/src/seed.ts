import prisma from './config/database';

const sampleTickets = [
    {
        title: 'Login page not loading properly',
        description: 'When I try to access the login page, it shows a blank white screen. This issue started happening after the latest update. I have tried clearing my browser cache but the problem persists.',
        status: 'OPEN' as const,
        priority: 'HIGH' as const
    },
    {
        title: 'Need password reset for my account',
        description: 'I forgot my password and the reset email is not arriving in my inbox. I have checked spam folder as well. Please help me recover access to my account as soon as possible.',
        status: 'IN_PROGRESS' as const,
        priority: 'MEDIUM' as const
    },
    {
        title: 'Feature request: Dark mode support',
        description: 'It would be great if the application had a dark mode option. Many users prefer dark themes for better visibility at night and to reduce eye strain during long usage sessions.',
        status: 'OPEN' as const,
        priority: 'LOW' as const
    },
    {
        title: 'Payment processing error on checkout',
        description: 'Getting an error message when trying to complete payment. The error says Transaction failed but my card details are correct. This is blocking me from making any purchases on the platform.',
        status: 'OPEN' as const,
        priority: 'HIGH' as const
    },
    {
        title: 'Mobile app crashes on startup',
        description: 'The mobile app crashes immediately after opening on my Android device. I am using a Samsung Galaxy S21 with Android 13. The app was working fine until yesterday but now it wont open at all.',
        status: 'RESOLVED' as const,
        priority: 'HIGH' as const
    },
    {
        title: 'Slow loading times on dashboard',
        description: 'The main dashboard is taking more than 30 seconds to load. This makes it very difficult to use the application efficiently. Other pages seem to work fine but dashboard is very slow.',
        status: 'IN_PROGRESS' as const,
        priority: 'MEDIUM' as const
    }
];

const sampleComments = [
    { authorName: 'Support Agent', message: 'Thank you for reporting this issue. We are looking into it.' },
    { authorName: 'John Doe', message: 'Any update on this? Still facing the same problem.' },
    { authorName: 'Tech Team', message: 'We have identified the root cause and working on a fix.' },
    { authorName: 'Admin', message: 'This should be resolved now. Please try again and let us know.' }
];

async function seed() {
    console.log('Starting database seeding...');

    // Clear existing data
    await prisma.comment.deleteMany();
    await prisma.ticket.deleteMany();
    console.log('Cleared existing data');

    // Create tickets
    const createdTickets = [];
    for (let i = 0; i < sampleTickets.length; i++) {
        const ticket = await prisma.ticket.create({
            data: sampleTickets[i]
        });
        createdTickets.push(ticket);
        console.log(`Created ticket: ${ticket.title}`);
    }

    // Add comments to first 3 tickets
    for (let i = 0; i < 3; i++) {
        const numComments = Math.min(i + 2, sampleComments.length);
        for (let j = 0; j < numComments; j++) {
            await prisma.comment.create({
                data: {
                    ticketId: createdTickets[i].id,
                    authorName: sampleComments[j].authorName,
                    message: sampleComments[j].message
                }
            });
        }
        console.log(`Added ${numComments} comments to ticket ${i + 1}`);
    }

    console.log('\nSeeding completed!');
    console.log(`Created ${sampleTickets.length} tickets`);
}

seed()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
