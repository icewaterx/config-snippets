#����wordpress siteURL
update wpcy_options set option_value=��http://localhost:8070/wordpress�� where option_id=36;
update wpcy_options set option_value=��http://localhost:8070/wordpress�� where option_id=1;


#�����������滻url��SQL���:
UPDATE wp_options SET option_value = REPLACE(option_value,'�ɵ�ַ','�µ�ַ');
UPDATE wp_posts SET post_content = REPLACE(post_content,'�ɵ�ַ','�µ�ַ');
UPDATE wp_posts SET post_excerpt= REPLACE(post_excerpt,'�ɵ�ַ','�µ�ַ');
UPDATE wp_posts SET guid= REPLACE(guid, '�ɵ�ַ','�µ�ַ');
UPDATE wp_comments SET comment_content = REPLACE(comment_content, '�ɵ�ַ','�µ�ַ') ;
UPDATE wp_comments SET comment_author_url = REPLACE(comment_author_url, '�ɵ�ַ','�µ�ַ') ;
UPDATE wp_posts SET pinged = REPLACE(pinged, '�ɵ�ַ','�µ�ַ');

#ע��Wordpress���ݿ����漸���ص��滻�ı���ֶ�:
#��wp_posts�����post_content (��������)
#��wp_posts�����pinged (ping����)
#��wp_posts�����guid (WordPressĬ�����ӽṹ)
#��wp_comments�����comment_author_url (��������URL��ַ )