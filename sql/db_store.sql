/*
Navicat MySQL Data Transfer

Source Server         : nantian2
Source Server Version : 50713
Source Host           : localhost:3306
Source Database       : db_store

Target Server Type    : MYSQL
Target Server Version : 50713
File Encoding         : 65001

Date: 2020-08-09 20:05:02
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for commoding
-- ----------------------------
DROP TABLE IF EXISTS `commoding`;
CREATE TABLE `commoding` (
  `c_id` int(11) NOT NULL AUTO_INCREMENT,
  `c_name` char(50) NOT NULL,
  `c_size` char(10) NOT NULL,
  `c_price` double NOT NULL,
  `st_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`c_id`),
  KEY `st_id` (`st_id`),
  CONSTRAINT `commoding_ibfk_1` FOREIGN KEY (`st_id`) REFERENCES `store` (`st_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of commoding
-- ----------------------------
INSERT INTO `commoding` VALUES ('2', '黄金虾', 'M', '9', '2');
INSERT INTO `commoding` VALUES ('3', '牛肉意面', 'M', '11', '2');
INSERT INTO `commoding` VALUES ('4', '土豆丸', 'M', '9', '2');
INSERT INTO `commoding` VALUES ('5', '杨枝甘露', '小份', '36', '6');
INSERT INTO `commoding` VALUES ('6', '白雪黑糯米小丸子', '中份', '26', '6');
INSERT INTO `commoding` VALUES ('7', '多芒小丸子', '中份', '26', '6');
INSERT INTO `commoding` VALUES ('8', '红豆双皮奶', '中份', '24', '6');
INSERT INTO `commoding` VALUES ('9', '芒果白雪小丸子', '中份', '24', '6');
INSERT INTO `commoding` VALUES ('10', '肉酱意面', '中份', '16', '3');
INSERT INTO `commoding` VALUES ('11', '特色烤肠拼盘', '中份', '15', '3');
INSERT INTO `commoding` VALUES ('12', '水果色拉', '中份', '13', '3');
INSERT INTO `commoding` VALUES ('13', '榴莲披萨', '中份', '28', '3');

-- ----------------------------
-- Table structure for store
-- ----------------------------
DROP TABLE IF EXISTS `store`;
CREATE TABLE `store` (
  `st_id` int(11) NOT NULL AUTO_INCREMENT,
  `st_name` char(50) NOT NULL,
  `st_address` char(100) NOT NULL,
  PRIMARY KEY (`st_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of store
-- ----------------------------
INSERT INTO `store` VALUES ('2', '小花披萨', '上海市静安区静安大道');
INSERT INTO `store` VALUES ('3', '萨莉亚意式餐厅', '上海浦东新区高科东路阳关天地B1层');
INSERT INTO `store` VALUES ('4', '四川香天下火锅', '上海浦东新区高科东路阳光天地四层');
INSERT INTO `store` VALUES ('5', '那时新疆', '上海浦东新区高科东路阳光天地四层');
INSERT INTO `store` VALUES ('6', '三花奶奶', '上海浦东新区唐镇地铁站三号口');
INSERT INTO `store` VALUES ('7', '柠莱烘焙', '上海浦东新区唐镇绿波城对面');
INSERT INTO `store` VALUES ('8', '芭比馒头', '上海浦东新区唐镇培元新苑对面');
INSERT INTO `store` VALUES ('9', '重庆老火锅', '上海浦东新区唐镇培元新苑对面');
INSERT INTO `store` VALUES ('10', '罗森', '上海浦东新区唐镇上丰路');
INSERT INTO `store` VALUES ('11', '全家', '上海浦东新区唐镇恒生商业广场');

-- ----------------------------
-- Table structure for workers
-- ----------------------------
DROP TABLE IF EXISTS `workers`;
CREATE TABLE `workers` (
  `w_id` int(11) NOT NULL AUTO_INCREMENT,
  `w_name` char(20) NOT NULL,
  `w_sex` char(2) NOT NULL,
  `st_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`w_id`),
  KEY `st_id` (`st_id`),
  CONSTRAINT `workers_ibfk_1` FOREIGN KEY (`st_id`) REFERENCES `store` (`st_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of workers
-- ----------------------------
INSERT INTO `workers` VALUES ('1', '王源', '男', '2');
INSERT INTO `workers` VALUES ('2', '小花', '女', '2');
INSERT INTO `workers` VALUES ('3', '小明', '男', '2');
INSERT INTO `workers` VALUES ('4', '蔡明', '女', '2');
INSERT INTO `workers` VALUES ('5', '王忧泉', '男', '3');
INSERT INTO `workers` VALUES ('6', '王乐乐', '女', '3');
INSERT INTO `workers` VALUES ('7', '张素苗', '女', '8');
