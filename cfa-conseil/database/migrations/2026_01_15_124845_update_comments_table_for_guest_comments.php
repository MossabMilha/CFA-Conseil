<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('comments', function (Blueprint $table) {
            if (!Schema::hasColumn('comments', 'status')) {
                $table->enum('status', ['pending', 'approved'])->default('pending');
            }

            // Ensure user_id is nullable
            $table->foreignId('user_id')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('comments', function (Blueprint $table) {
            if (Schema::hasColumn('comments', 'status')) {
                $table->dropColumn('status');
            }

            $table->foreignId('user_id')->nullable(false)->change();
        });
    }
};
