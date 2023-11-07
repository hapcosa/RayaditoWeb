from django.shortcuts import render

# Create your views here.
class Region(models.TextChoices):
    uno = ' Arica y Parinacota.'
    dos = ' Tarapaca'
    tres =' Antofagasta'
    cuatro = 'Atacama'
    cinco = 'Coquimbo'
    seis ='Valparaiso'
    siete = 'Metropolitana'
    ocho = 'O`higgins'
    nueve = 'Maule'
    diez = 'Ñuble'
    once = 'Biobío'
    doce= 'La Araucania'
    trece='Los Rios'
    catorce ='Los Lagos'
    quince = 'Aysén'
    dieciseis = 'Magallanes'