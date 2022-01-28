<?php

namespace Database\Seeders;

use App\Models\DataPegawai;
use Illuminate\Database\Seeder;

class DataPegawaiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $data = [
            [
                'nama' => 'M BAYU SASINDA',
                'usia' => 26,
                'jenis_kelamin' => 'L',
                'pangkat_golongan_id' => 1,
            ],
            [
                'nama' => 'Junaidi',
                'usia' => 26,
                'jenis_kelamin' => 'L',
                'pangkat_golongan_id' => 2,
            ],
        ];

        foreach ($data as $item) {
            DataPegawai::insert($item);
        }
    }
}
