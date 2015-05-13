#更改wordpress siteURL
update wpcy_options set option_value=”http://localhost:8070/wordpress” where option_id=36;
update wpcy_options set option_value=”http://localhost:8070/wordpress” where option_id=1;


#更改域名后替换url的SQL语句:
UPDATE wp_options SET option_value = REPLACE(option_value,'旧地址','新地址');
UPDATE wp_posts SET post_content = REPLACE(post_content,'旧地址','新地址');
UPDATE wp_posts SET post_excerpt= REPLACE(post_excerpt,'旧地址','新地址');
UPDATE wp_posts SET guid= REPLACE(guid, '旧地址','新地址');
UPDATE wp_comments SET comment_content = REPLACE(comment_content, '旧地址','新地址') ;
UPDATE wp_comments SET comment_author_url = REPLACE(comment_author_url, '旧地址','新地址') ;
UPDATE wp_posts SET pinged = REPLACE(pinged, '旧地址','新地址');

#注：Wordpress数据库里面几个重点替换的表和字段:
#表wp_posts里面的post_content (文章内容)
#表wp_posts里面的pinged (ping内容)
#表wp_posts里面的guid (WordPress默认链接结构)
#表wp_comments里面的comment_author_url (留言作者URL地址 )