select * from articles inner join comments on comments.article_id = articles.id;

mysql> select * from  articles join article_has_category on articles.id = article_has_category.article_id join categories on categories.id = article_has_category.category_id where theme='education';