<?php

namespace Database\Seeders;

use App\Models\MenuItem;
use Illuminate\Database\Seeder;

class MenuItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            [
                'name' => 'Homard Thermidor',
                'description' => 'Homard entier rôti dans une sauce crémeuse à la moutarde et au brandy, gratiné au parmesan.',
                'ingredients' => 'Homard breton, beurre salé, oignons, champignons de Paris, moutarde de Dijon, brandy, crème fraîche, parmesan.',
                'price' => 65.00,
                'category' => 'Plats',
                'image_path' => 'https://images.unsplash.com/photo-1559742811-82410b451b9b?auto=format&fit=crop&q=80&w=800',
            ],
            [
                'name' => 'Filet de Bœuf Rossini',
                'description' => 'Tournedos de bœuf poêlé, surmonté d\'une tranche de foie gras de canard et de lamelles de truffe noire.',
                'ingredients' => 'Filet de bœuf (Limousin), foie gras frais, truffe noire du Périgord, pain de mie, sauce Madère.',
                'price' => 72.00,
                'category' => 'Plats',
                'image_path' => 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
            ],
            [
                'name' => 'Risotto à la Truffe Blanche',
                'description' => 'Riz Carnaroli lié au parmesan Reggiano 36 mois, parfumé à la truffe blanche d\'Alba.',
                'ingredients' => 'Riz Carnaroli, bouillon de volaille corsé, échalotes, vin blanc sec, parmesan Reggiano, truffe blanche fraîche.',
                'price' => 58.00,
                'category' => 'Entrées',
                'image_path' => 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800',
            ],
            [
                'name' => 'Soufflé au Grand Marnier',
                'description' => 'Soufflé aérien parfumé à la liqueur d\'orange, servi avec une crème anglaise onctueuse.',
                'ingredients' => 'Œufs frais, lait, beurre, farine, sucre glace, Grand Marnier, gousse de vanille Bourbon.',
                'price' => 18.00,
                'category' => 'Desserts',
                'image_path' => 'https://images.unsplash.com/photo-1511910849309-0dffb8785146?auto=format&fit=crop&q=80&w=800',
            ],
            [
                'name' => 'Noix de Saint-Jacques de la Baie de Seine',
                'description' => 'Saint-Jacques snakées au beurre demi-sel, mousseline de panais colorée et émulsion au corail.',
                'ingredients' => 'Saint-Jacques fraîches, panais, lait, crème liquide, corail, micro-pousses.',
                'price' => 42.00,
                'category' => 'Entrées',
                'image_path' => 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800',
            ],
        ];

        foreach ($items as $item) {
            MenuItem::updateOrCreate(
                ['name' => $item['name']],
                $item
            );
        }
    }
}
