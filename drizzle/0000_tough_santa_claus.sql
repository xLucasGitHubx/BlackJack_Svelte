CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`first_name` varchar(255) NOT NULL DEFAULT '',
	`last_name` varchar(255) NOT NULL DEFAULT '',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
