<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DataPegawai extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'data_pegawai';

    public function pangkat_golongan()
    {
        return $this->belongsTo(PangkatGolongan::class, 'pangkat_golongan_id', 'id');

    }
}
