<?php

namespace Database\Seeders;

use App\Models\PangkatGolongan;
use Illuminate\Database\Seeder;

class PangkatGolonganSeeder extends Seeder
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
                'nama' => 'Golongan Ia',
                'keterangan' => 'Juru Muda',
            ],
            [
                'nama' => 'Golongan Ib',
                'keterangan' => 'Juru Muda Tingkat 1',
            ],
        ];

        foreach ($data as $item) {
            PangkatGolongan::insert($item);
        }
    }
}
