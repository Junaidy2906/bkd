<?php

namespace App\Http\Controllers;

use App\Http\Requests\DataPegawaiFormRequest as FormRequest;
use App\Models\DataPegawai;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DataPegawaiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //

        $posts = DataPegawai::orderBy($request->sortby, $request->sortbydesc)
            ->when(request()->q, function ($posts) {
                $posts = $posts->where('nama', 'LIKE', '%' . request()->q . '%')
                    ->orWhere('usia', 'LIKE', '%' . request()->q . '%')
                    ->orWhere('jenis_kelamin', 'LIKE', '%' . request()->q . '%');
            });
        $items = $posts->with('pangkat_golongan')
            ->paginate(request()->per_page);
        return response()->json(['status' => 'success', 'data' => $items]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(FormRequest $request)
    {
        //
        $runTransaction = function () use ($request) {
            try {
                $rowItem = new DataPegawai();
                $rowItem->nama = $request->nama;
                $rowItem->usia = $request->usia;
                $rowItem->jenis_kelamin = $request->jenis_kelamin;
                $rowItem->pangkat_golongan_id = $request->pangkat_golongan_id;
                $rowItem->save();

                $statusCode = JsonResponse::HTTP_OK;
                $status = [
                    'code'      => $statusCode,
                    'name'      => 'OK',
                    'message'   => 'Pangkat Golongan Save Successfully',
                ];

                /**
                 * Return Hasil
                 * --------------------------------------------------
                 */
                return response()->json([
                    'error' => false,
                    'status' => $status,
                ], $statusCode);
            } catch (Exception $e) {
                $statusCode = $e->getCode();
                $status = [
                    'code'      => $e->getCode(),
                    'name'      => '',
                    // 'message'   => $e->getMessage()
                ];
                return response()->json([
                    'error' => true,
                    'status' => $status
                ], $statusCode);
            }
        };
        $return = DB::transaction($runTransaction);
        return $return;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $data = DataPegawai::with('pangkat_golongan')
            ->findOrFail($id);
        $statusCode = JsonResponse::HTTP_OK;
        $status = [
            'statusCode' => $statusCode . " OK",
            'status'    => 'success',
            'code'      => 0,
            'message'   => 'show user'
        ];

        return response()->json([
            'rows' => $data,
            'status' => $status,
        ], $statusCode);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(FormRequest $request, $id)
    {
        //

        $runTransaction = function () use ($request, $id) {
            try {
                $rowItem = DataPegawai::findOrFail($id);
                $rowItem->nama = $request->nama;
                $rowItem->usia = $request->usia;
                $rowItem->jenis_kelamin = $request->jenis_kelamin;
                $rowItem->pangkat_golongan_id = $request->pangkat_golongan_id;
                $rowItem->save();

                $statusCode = JsonResponse::HTTP_OK;
                $status = [
                    'code'      => $statusCode,
                    'name'      => 'OK',
                    'message'   => 'Pangkat Golongan Update Successfully',
                ];

                /**
                 * Return Hasil
                 * --------------------------------------------------
                 */
                return response()->json([
                    'error' => false,
                    'status' => $status,
                ], $statusCode);
            } catch (Exception $e) {
                $statusCode = $e->getCode();
                $status = [
                    'code'      => $e->getCode(),
                    'name'      => '',
                    // 'message'   => $e->getMessage()
                ];
                return response()->json([
                    'error' => true,
                    'status' => $status
                ], $statusCode);
            }
        };
        $return = DB::transaction($runTransaction);
        return $return;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $runTransaction = function () use ($id) {
            try {
                /**
                 * Table ERD tidak perlu dihapus
                 * Jika menggunakan SoflDeletes
                 * --------------------------------------------------
                 */

                /**
                 * Query 01
                 * --------------------------------------------------
                 * SoftDeletes tabel induk
                 */
                $rowItem = DataPegawai::findOrfail($id);
                $rowItem->delete();

                // /**
                //  * Query 01
                //  * --------------------------------------------------
                //  * SoftDeletes tabel ERD (hasMany)
                //  */
                // $rowItemWakil = Npwrd::where('npwrd_id', $id);
                // $rowItemWakil->delete();

                // /**
                //  * Query 02
                //  * --------------------------------------------------
                //  * SoftDeletes tabel ERD (hasMany)
                //  */
                // $rowItemWakil = User::where('pegawai_id', $id);
                // $rowItemWakil->delete();

                /**
                 * Return Hasil
                 * --------------------------------------------------
                 */
                $statusCode = JsonResponse::HTTP_OK;
                $status = [
                    'statusCode' => $statusCode . " Deleted",
                    'status'    => 'success',
                    'code'      => 0,
                    'message'   => 'delete opd'
                ];

                return response()->json([
                    'rows' => $rowItem,
                    'status' => $status,
                ], $statusCode);
                // return ($rowItem)
                //     ->additional([
                //         'status'    => $status
                //     ])
                //     ->response()
                //     ->setStatusCode($statusCode);
            } catch (Exception $e) {
                return response()->json(
                    [
                        'error' => 'Unable to delete',
                        // 'msg' => $e->getMessage()
                    ],
                    400
                );
            }
        };
        $return = DB::transaction($runTransaction);
        return $return;
    }
}
