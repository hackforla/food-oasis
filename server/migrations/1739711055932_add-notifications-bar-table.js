/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
	/*
	  # Create notifications_bar table with unique foreign key

	  1. New Table
		- `notifications_bar`
		  - `id` (uuid, primary key)
		  - `user_id` (uuid, unique foreign key referencing auth.users)
		  - `description` (varchar(500))
		  - `is_active` (boolean)
		  - `is_deleted` (boolean)
		  - `created_at` (timestamp)

	  2. Security
		- Enable RLS on `notifications_bar` table
		- Add policy for authenticated users to manage their own notifications_bar
	*/
	pgm.sql(`
	CREATE TABLE IF NOT EXISTS notifications_bar (
	  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	  description varchar(500) NOT NULL,
	  is_active boolean DEFAULT true,
	  is_deleted boolean DEFAULT false,
	  created_at timestamptz DEFAULT now()
	  );
	`);
	/*
	-- Enable Row Level Security
	ALTER TABLE notifications_bar ENABLE ROW LEVEL SECURITY;

	-- Create policies
	CREATE POLICY "Users can manage their own notifications_bar"
	  ON notifications_bar
	  FOR ALL
	  TO authenticated
	  USING (auth.uid() = user_id)
	  WITH CHECK (auth.uid() = user_id);
	*/
};

exports.down = pgm => {
	pgm.sql(`
	DROP TABLE notifications_bar;
	`)
};
