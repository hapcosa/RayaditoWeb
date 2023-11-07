from django.db import models


class Countries(models.TextChoices):
    cero = '...'
    uno = 'Arica y Parinacota'
    dos = 'Tarapaca'
    tres ='Antofagasta'
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
    
    
    