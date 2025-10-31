import { getServerSideSitemapLegacy } from 'next-sitemap';
import { commonService } from '../core/services'; 
import { CONST } from '../core/helper'; 

const domain = process.env.NEXT_PUBLIC_SITE_DOMAIN || 'https://www.truefriendmatrimony.com';

export const getServerSideProps = async (ctx) => {
    console.log("--- Starting getServerSideProps for /server-sitemap.xml ---");
    console.log("Domain configured:", domain);
  
    let blogPosts = [];
    try {
    
      const res = await fetch("https://webadminback.truefriendmatrimony.com/api/blogs"); 
      
      console.log("Raw API response status:", res.status);
      const result = await res.json(); 
      
      console.log("Parsed API response from blogs endpoint:", result);
  
      if (result && Array.isArray(result.response)) {
        blogPosts = result.response;
        console.log("Successfully fetched blog posts. Count:", blogPosts.length);
        if (blogPosts.length > 0) {
          console.log("First blog post item (for structure check):", blogPosts[0]);
        }
      } else {
        console.error("Unexpected API response format from blogs endpoint:", result);
      }
    } catch (error) {
      console.error("Error fetching blog posts for sitemap directly:", error);
    }
  
    const fields = blogPosts.map((post) => {

      const blogSlug = post.id; 
      
      const loc = `${domain}${CONST.BLOGS_DETAIL}/${blogSlug}`; 
      

      const lastmod = new Date(post.updatedAt || post.created_at).toISOString(); 
  
      // FIX: Moved console.log AFTER 'loc' is defined to resolve ReferenceError.
      console.log(`Mapping blog: ID=${post.id}, Canonical Slug=${blogSlug}, URL=${loc}, LastMod=${lastmod}`); 
      
      return {
        loc, 
        lastmod, 
        changefreq: 'weekly', 
        priority: 0.8, 
      };
    }).filter(field => {
      // Basic validation to ensure the URL is valid before including it in the sitemap.
      const isValid = field.loc && field.loc.startsWith(domain) && field.loc.includes(CONST.BLOGS_DETAIL) && field.loc.split('/').pop().length > 0;
      if (!isValid) {
        console.warn("Skipping malformed sitemap URL:", field.loc); 
      }
      return isValid;
    });
  
    console.log("Final fields array for sitemap:", fields); 
    console.log("--- Finishing getServerSideProps for /server-sitemap.xml ---"); 
  
    return getServerSideSitemapLegacy(ctx, fields);
  };
  
  export default function ServerSitemap() {
    return null;
  }
  