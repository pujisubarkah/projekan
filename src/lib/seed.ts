import { db } from './db';
import { roles, users, categories, skills, courseCategories, courses, courseModules, courseLessons } from './schema';

async function seed() {
  console.log('🌱 Seeding database...');

  // Insert roles
  console.log('📝 Inserting roles...');
  await db.insert(roles).values([
    { name: 'admin', label: 'Administrator' },
    { name: 'client', label: 'Client' },
    { name: 'freelancer', label: 'Freelancer' },
  ]);

  // Insert categories
  console.log('📂 Inserting categories...');
  await db.insert(categories).values([
    { name: 'Desain Grafis', slug: 'desain-grafis', description: 'Jasa desain logo, branding, dan visual lainnya' },
    { name: 'Pengembangan Web', slug: 'pengembangan-web', description: 'Pembuatan website, aplikasi web, dan sistem online' },
    { name: 'Penulisan', slug: 'penulisan', description: 'Jasa penulisan artikel, konten, dan copywriting' },
    { name: 'Pemasaran Digital', slug: 'pemasaran-digital', description: 'Strategi marketing online dan kampanye digital' },
    { name: 'Fotografi', slug: 'fotografi', description: 'Jasa fotografi produk, event, dan portrait' },
    { name: 'Video Editing', slug: 'video-editing', description: 'Editing video, motion graphics, dan animasi' },
  ]);

  // Insert skills
  console.log('🛠️ Inserting skills...');
  await db.insert(skills).values([
    { name: 'Adobe Illustrator' },
    { name: 'Adobe Photoshop' },
    { name: 'Adobe Premiere Pro' },
    { name: 'Figma' },
    { name: 'Sketch' },
    { name: 'HTML/CSS' },
    { name: 'JavaScript' },
    { name: 'React' },
    { name: 'Node.js' },
    { name: 'Python' },
    { name: 'PHP' },
    { name: 'Laravel' },
    { name: 'WordPress' },
    { name: 'SEO' },
    { name: 'Social Media Marketing' },
    { name: 'Content Writing' },
    { name: 'Copywriting' },
    { name: 'Photography' },
    { name: 'Video Editing' },
    { name: 'Logo Design' },
    { name: 'Branding' },
    { name: 'UI/UX Design' },
    { name: 'Mobile App Development' },
  ]);

  // Insert admin user
  console.log('👤 Inserting admin user...');
  await db.insert(users).values({
    email: 'admin@projekan.test',
    passwordHash: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: password
    name: 'Admin Projekan',
    roleId: 1, // admin
    isVerified: true,
  });

  // Insert course categories
  console.log('📚 Inserting course categories...');
  await db.insert(courseCategories).values([
    { name: 'Web Development', slug: 'web-development', description: 'Learn web development from basics to advanced', icon: '💻', color: '#3B82F6' },
    { name: 'Mobile Development', slug: 'mobile-development', description: 'Build mobile apps for iOS and Android', icon: '📱', color: '#10B981' },
    { name: 'UI/UX Design', slug: 'ui-ux-design', description: 'Master user interface and experience design', icon: '🎨', color: '#F59E0B' },
    { name: 'Digital Marketing', slug: 'digital-marketing', description: 'Grow your business with digital marketing strategies', icon: '📈', color: '#EF4444' },
    { name: 'Data Science', slug: 'data-science', description: 'Analyze data and build machine learning models', icon: '📊', color: '#8B5CF6' },
    { name: 'Graphic Design', slug: 'graphic-design', description: 'Create stunning visual designs', icon: '✏️', color: '#EC4899' },
  ]);

  // Insert sample courses
  console.log('🎓 Inserting sample courses...');
  const courseData = await db.insert(courses).values([
    {
      instructorId: 1,
      categoryId: 1,
      title: 'Complete Web Development Bootcamp',
      slug: 'complete-web-development-bootcamp',
      description: 'Learn HTML, CSS, JavaScript, React, Node.js and build full-stack web applications from scratch. This comprehensive course covers everything you need to become a professional web developer.',
      shortDescription: 'Master full-stack web development with modern technologies',
      thumbnailUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=225&fit=crop',
      price: 500000,
      level: 'beginner' as const,
      status: 'published' as const,
      duration: 2400,
      language: 'id',
      prerequisites: 'Basic computer skills',
      learningObjectives: ['Build responsive websites with HTML & CSS', 'Create interactive web applications with JavaScript', 'Develop full-stack apps with React & Node.js', 'Deploy applications to production', 'Work with databases and APIs'],
      tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
      isFree: false,
      isFeatured: true,
      enrollmentCount: 1250,
      rating: 4.8,
      reviewCount: 89,
      publishedAt: new Date('2024-01-15'),
    } as any,
    {
      instructorId: 1,
      categoryId: 3,
      title: 'UI/UX Design Masterclass',
      slug: 'ui-ux-design-masterclass',
      description: 'Master the art of user interface and user experience design. Learn design principles, prototyping, user research, and create stunning digital products that users love.',
      shortDescription: 'Create user-centered designs that convert',
      thumbnailUrl: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=225&fit=crop',
      price: 750000,
      level: 'intermediate' as const,
      status: 'published' as const,
      duration: 1800,
      language: 'id',
      prerequisites: 'Basic design knowledge recommended',
      learningObjectives: ['Understand UI/UX design principles', 'Conduct user research and usability testing', 'Create wireframes and prototypes', 'Design mobile and web interfaces', 'Build design systems and style guides'],
      tags: ['UI Design', 'UX Design', 'Figma', 'Prototyping', 'User Research'],
      isFree: false,
      isFeatured: true,
      enrollmentCount: 890,
      rating: 4.9,
      reviewCount: 67,
      publishedAt: new Date('2024-02-01'),
    } as any,
    {
      instructorId: 1,
      categoryId: 4,
      title: 'Digital Marketing Mastery',
      slug: 'digital-marketing-mastery',
      description: 'Learn comprehensive digital marketing strategies including SEO, SEM, social media marketing, email marketing, and analytics. Grow your business online with proven techniques.',
      shortDescription: 'Dominate digital marketing and grow your business',
      thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop',
      price: 0,
      level: 'beginner' as const,
      status: 'published' as const,
      duration: 1200,
      language: 'id',
      prerequisites: 'None',
      learningObjectives: ['Master SEO and content marketing', 'Run effective social media campaigns', 'Use Google Ads and Facebook Ads', 'Build email marketing sequences', 'Analyze marketing performance with data'],
      tags: ['SEO', 'Social Media', 'Google Ads', 'Email Marketing', 'Analytics'],
      isFree: true,
      isFeatured: false,
      enrollmentCount: 2500,
      rating: 4.7,
      reviewCount: 156,
      publishedAt: new Date('2024-01-20'),
    } as any,
  ]).returning({ id: courses.id });

  // Insert course modules and lessons for the first course
  if (courseData.length > 0) {
    const courseId = courseData[0].id;

    console.log('📖 Inserting course modules and lessons...');

    // Module 1: HTML & CSS Fundamentals
    const module1Data = await db.insert(courseModules).values({
      courseId,
      title: 'HTML & CSS Fundamentals',
      description: 'Learn the building blocks of web development',
      order: 1,
      duration: 600, // 10 hours
    }).returning({ id: courseModules.id });

    if (module1Data.length > 0) {
      await db.insert(courseLessons).values([
        {
          moduleId: module1Data[0].id,
          title: 'Introduction to HTML',
          description: 'Learn the basics of HTML structure',
          type: 'video',
          content: 'HTML is the standard markup language for creating web pages...',
          duration: 1800, // 30 minutes
          order: 1,
          isPreview: true,
        },
        {
          moduleId: module1Data[0].id,
          title: 'CSS Styling Basics',
          description: 'Style your HTML with CSS',
          type: 'video',
          content: 'CSS is used to describe the presentation of a document...',
          duration: 2400, // 40 minutes
          order: 2,
          isPreview: false,
        },
        {
          moduleId: module1Data[0].id,
          title: 'HTML & CSS Quiz',
          description: 'Test your knowledge of HTML and CSS basics',
          type: 'quiz',
          duration: 900, // 15 minutes
          order: 3,
          isPreview: false,
        },
      ]);
    }

    // Module 2: JavaScript Essentials
    const module2Data = await db.insert(courseModules).values({
      courseId,
      title: 'JavaScript Essentials',
      description: 'Master JavaScript programming fundamentals',
      order: 2,
      duration: 900, // 15 hours
    }).returning({ id: courseModules.id });

    if (module2Data.length > 0) {
      await db.insert(courseLessons).values([
        {
          moduleId: module2Data[0].id,
          title: 'JavaScript Variables and Data Types',
          description: 'Learn about variables, constants, and data types in JavaScript',
          type: 'video',
          content: 'JavaScript variables are containers for storing data values...',
          duration: 2100, // 35 minutes
          order: 1,
          isPreview: false,
        },
        {
          moduleId: module2Data[0].id,
          title: 'Functions and Scope',
          description: 'Understanding functions and variable scope',
          type: 'video',
          content: 'A JavaScript function is a block of code designed to perform a particular task...',
          duration: 2700, // 45 minutes
          order: 2,
          isPreview: false,
        },
      ]);
    }
  }

  console.log('✅ Database seeded successfully!');
}

// Run seed
seed().catch((error) => {
  console.error('❌ Error seeding database:', error);
  process.exit(1);
});