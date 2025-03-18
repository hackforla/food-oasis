/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
	/*
	  # Create local_notifications table with unique foreign key

	  1. New Table
		- `local_notifications`
		  - `id` (uuid, primary key)
		  - `user_id` (uuid, unique foreign key referencing auth.users)
		  - `description` (varchar(500))
		  - `is_active` (boolean)
		  - `is_deleted` (boolean)
		  - `created_at` (timestamp)

	  2. Security
		- Enable RLS on `local_notifications` table
		- Add policy for authenticated users to manage their own local_notifications
	*/
	pgm.sql(`
	CREATE TABLE IF NOT EXISTS local_notifications (
	  id integer primary key,
	  name character varying NOT NULL
	  );
	`);
	/*
	-- Enable Row Level Security
	ALTER TABLE local_notifications ENABLE ROW LEVEL SECURITY;

	-- Create policies
	CREATE POLICY "Users can manage their own local_notifications"
	  ON local_notifications
	  FOR ALL
	  TO authenticated
	  USING (auth.uid() = user_id)
	  WITH CHECK (auth.uid() = user_id);
	*/
};

exports.down = pgm => {
	pgm.sql(`
	DROP TABLE local_notifications;
	`)
};
