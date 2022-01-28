<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDataPegawaiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('data_pegawai', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->integer('usia');
            $table->enum('jenis_kelamin', ['L', 'P']);
            $table->foreignId('pangkat_golongan_id')
                ->constrained('pangkat_golongan')
                ->onUpdate('cascade')
                ->onDelete('restrict')
                ->comment('');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('data_pegawai');
    }
}
