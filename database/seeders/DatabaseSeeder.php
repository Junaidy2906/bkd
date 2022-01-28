<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->command->info('Membuat data dummy.');
        $this->command->info('--------------------------------------------------');

        // disable foregnkey ...
        Schema::disableForeignKeyConstraints();

        // call reset ...
        // $this->reset();

        $this->call([
            UserSeeder::class,
            PangkatGolonganSeeder::class,
            DataPegawaiSeeder::class,
        ]);

        // enable foregnkey ...
        Schema::enableForeignKeyConstraints();

        $this->command->info('--------------------------------------------------');
        $this->command->info('Data dummy telah dibuat.');
    }
}
