INSERT INTO Author (id, name, surname) VALUES (1, 'Jan', 'Kowalski');
INSERT INTO Author (id, name, surname) VALUES (2, 'Tomasz', 'Nowak');
INSERT INTO Author (id, name, surname) VALUES (3, 'Janusz', 'Jakis');
INSERT INTO Book(id, isbn,title,url, author_id) VALUES (1, 32131,'Potop', 'https://about.canva.com/wp-content/uploads/sites/3/2015/01/art_bookcover.png',1);
INSERT INTO Book(id, isbn,title,url, author_id) VALUES (2, 32132,'Niziołek', 'https://about.canva.com/wp-content/uploads/sites/3/2015/01/art_bookcover.png',2);
INSERT INTO Book(id, isbn,title,url, author_id) VALUES (3, 32133,'Odsdas', 'https://about.canva.com/wp-content/uploads/sites/3/2015/01/art_bookcover.png',3);
INSERT INTO User (id, username, password, enabled, role) VALUES (1, 'user', '{noop}password',1,'USER');

