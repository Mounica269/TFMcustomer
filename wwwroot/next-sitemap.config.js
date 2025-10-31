// // // module.exports = {
// // //     siteUrl: 'https://truefriendmatrimony.com', 
// // //     generateRobotsTxt: true, 
// // //     sitemapSize: 5000, 
// // //     generateIndexSitemap: false, 
// // //   };
  


// // module.exports = {
// //   siteUrl:  'https://www.truefriendmatrimony.com', 
// //   generateRobotsTxt: true, 
// //   sitemapSize: 7000,       
// //   generateIndexSitemap: false, 
// //   sourceDir: 'build',  

// //   exclude: [
 
// //     '/login',
// //     '/register',
// //     '/forgot-password',
// //     '/reset-password',
// //     '/activate',
// //     '/mobile-verification',
// //     '/my-matrimony*',      
// //     '/edit-profile',
// //     '/profile',
// //     '/profile-completion*', 
// //     '/upload-photos',
// //     '/inbox*',              
// //     '/matches*',            
// //     '/plan-upgrade',
// //     '/payment-success',
// //     '/payment-failure',
// //     '/plans_after_sub',
// //     '/new',
// //     '/be-safe-online',
// //     '/maintenancePage',
// //     '/plans copy',
// //     '/privacy',
// //     '/return-and-cancellation',
// //     '/search/advance',
// //     '/search/basic',
// //     '/success-stories-form',
// //     '/success-stories-form copy',
// //     '/terms-and-use',
// //     '/success-stories-detail',


// //   ],
// //   outDir: './.next-sitemap-temp', 
 
// //   robotsTxtOptions: {
// //     policies: [
// //       {
// //         userAgent: '*', 
// //         allow: '/',     
// //       },
 
// //     ],
    
// //     additionalSitemaps: [
// //       `${process.env.NEXT_PUBLIC_SITE_DOMAIN || 'https://www.truefriendmatrimony.com'}/sitemap.xml`,
// //       `${process.env.NEXT_PUBLIC_SITE_DOMAIN || 'https://www.truefriendmatrimony.com'}/server-sitemap.xml`,
     
// //     ],
// //   },

// // };

// // module.exports = {
// //     siteUrl: 'https://truefriendmatrimony.com', 
// //     generateRobotsTxt: true, 
// //     sitemapSize: 5000, 
// //     generateIndexSitemap: false, 
// //   };
  
// const slugify = require('slugify');

// module.exports = {
//   siteUrl:  'https://www.truefriendmatrimony.com', 
//   generateRobotsTxt: true, 
//   sitemapSize: 7000,       
//   generateIndexSitemap: false, 
//   sourceDir: 'build',  

//   exclude: [
//     '/server-sitemap.xml',
//     '/login',
//     '/register',
//     '/forgot-password',
//     '/reset-password',
//     '/activate',
//     '/mobile-verification',
//     '/my-matrimony*',      
//     '/edit-profile',
//     '/profile',
//     '/profile-completion*', 
//     '/upload-photos',
//     '/inbox*',              
//     '/matches*',            
//     '/plan-upgrade',
//     '/payment-success',
//     '/payment-failure',
//     '/plans_after_sub',
//     '/new',
//     '/be-safe-online',
//     '/maintenancePage',
//     '/plans copy',
//     '/privacy',
//     '/return-and-cancellation',
//     '/search/advance',
//     '/search/basic',
//     '/success-stories-form',
//     '/success-stories-form copy',
//     '/terms-and-use',
//     '/success-stories-detail',
//     '/blog-detail',
//     '/category',

//   ],

 
//   robotsTxtOptions: {
//     policies: [
//       {
//         userAgent: '*', 
//         allow: '/',     
//       },
 
//     ],
    
//     additionalSitemaps: [
//       `${process.env.SITE_URL || 'https://www.truefriendmatrimony.com'}/sitemap.xml`,
     
//     ],
//   },


  
//   async additionalPaths(config) {
//     const API_URL = 'https://webadminback.truefriendmatrimony.com/api/blogs';
//    // const BLOG_DETAIL_BASE_PATH = '/blog-detail?'; // The base path for your blog detail page

//     try {
//       const res = await fetch(API_URL);
//       if (!res.ok) {
//         console.error(`Failed to fetch blogs from ${API_URL}. Status: ${res.status}`);
//         return []; // Return empty array if fetch fails
//       }
//       const data = await res.json();

//       if (!data.status || !Array.isArray(data.response)) {
//         console.error('API response format is not as expected:', data);
//         return []; // Return empty array if API response is not valid
//       }

//       const blogPaths = data.response.map((blog) => {
//         // Construct the dynamic URL with the query parameter
//        // const blogUrl = `${BLOG_DETAIL_BASE_PATH}?blogId=${blog.title}`;
      
// const slug = slugify(blog.title, { lower: true, strict: true });
//  const blogUrl = `https://truefriendmatrimony.com/blog-detail?blogId=${slug}`;



        
//         // Use a more appropriate 'lastmod' if available (e.g., 'updated_at' from your API)
//         const lastMod = blog.updated_at ? new Date(blog.updated_at).toISOString() : new Date().toISOString();

//         return {
//           loc: blogUrl,
//           lastmod: lastMod,
//           changefreq: 'weekly', // Adjust as needed
//           priority: 0.7, // Adjust as needed
//         };
//       });

//       console.log('Generated dynamic blog sitemap entries:', blogPaths.length);
//       return blogPaths;

//     } catch (error) {
//       console.error('Error fetching blogs for sitemap generation:', error);
//       return []; // Return empty array on error
//     }
//   },


// };


const slugify = require('slugify');

module.exports = {
  siteUrl: 'https://www.truefriendmatrimony.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  generateIndexSitemap: false,
  sourceDir: 'build',
  
  // List of paths to exclude from the sitemap
  exclude: [
    '/server-sitemap.xml',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/activate',
    '/mobile-verification',
    '/my-matrimony*',
    '/edit-profile',
    '/profile',
    '/profile-completion*',
    '/upload-photos',
    '/inbox*',
    '/matches*',
    '/plan-upgrade',
    '/payment-success',
    '/payment-failure',
    '/plans_after_sub',
    '/new',
    '/be-safe-online',
    '/maintenancePage',
    '/plans copy',
    '/privacy',
    '/return-and-cancellation',
    '/search/advance',
    '/search/basic',
    '/success-stories-form',
    '/success-stories-form copy',
    '/terms-and-use',
    '/success-stories-detail',
    '/blog-detail', // Exclude the template page itself
    '/category',
  ],

  // Set a temporary directory to store the sitemap files during generation
outDir: './public',


  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      // Use the SITE_URL environment variable for flexibility
      `${process.env.SITE_URL || 'https://www.truefriendmatrimony.com'}/sitemap.xml`,
    ],
  },
  
  // Asynchronously fetch blog data to generate dynamic paths
  async additionalPaths(config) {
    const API_URL = 'https://webadminback.truefriendmatrimony.com/api/blogs';

    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        console.error(`Failed to fetch blogs from ${API_URL}. Status: ${res.status}`);
        return [];
      }
      const data = await res.json();

      if (!data.status || !Array.isArray(data.response)) {
        console.error('API response format is not as expected:', data);
        return [];
      }

       return data.response.map((blog) => {
        // ✅ slugify blog title for SEO-friendly URLs
        const slug = slugify(blog.title, { lower: true, strict: true });

        return {
          // ✅ always use siteUrl instead of hardcoding
          loc: `${config.siteUrl}/blog-detail?blogId=${slug}`,
          lastmod: blog.updated_at
            ? new Date(blog.updated_at).toISOString()
            : new Date().toISOString(),
          changefreq: 'weekly',
          priority: 0.7,
        };
      });
    } catch (error) {
      console.error('Error fetching blogs for sitemap generation:', error);
      return [];
    }
  },
};
