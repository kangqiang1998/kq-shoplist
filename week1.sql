# Host: localhost  (Version: 5.0.45-community-nt)
# Date: 2019-12-17 14:32:14
# Generator: MySQL-Front 5.3  (Build 4.43)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "shop"
#

DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop` (
  `Id` int(11) NOT NULL auto_increment,
  `name` text NOT NULL,
  `price` int(11) NOT NULL default '0',
  `num` int(11) NOT NULL default '0',
  PRIMARY KEY  (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

#
# Data for table "shop"
#

INSERT INTO `shop` VALUES (2,'阿迪达斯 起源系列碎钉足球鞋',1350,600),(3,'EVENSO双重抗寒夹克',590,1000),(4,'Air Jordan扎染 油画运动鞋',500,100),(6,'vans',450,50),(7,'波司登羽绒服',1288,20),(8,'olay',55,2220),(9,'自热火锅',30,30000);

#
# Structure for table "users"
#

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL auto_increment,
  `username` text NOT NULL,
  `phone` text NOT NULL,
  `password` text NOT NULL,
  `img` text,
  `age` int(11) default NULL,
  `sex` int(11) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

#
# Data for table "users"
#

INSERT INTO `users` VALUES (1,'lisa','15181158388','123456',NULL,NULL,NULL),(2,'康蔷','15181158389','123456',NULL,NULL,NULL),(3,'anan','13181158388','aaaaaa',NULL,NULL,NULL),(4,'康蔷','13465874884','123456',NULL,NULL,NULL),(5,'周舒','13438781991','123456',NULL,NULL,NULL),(6,'siri','15858458622','123456',NULL,NULL,NULL);
